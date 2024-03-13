// Import necessary dependencies and components

import React, { useEffect, useMemo, useState } from "react";
import { Map as GoogleMap } from "@vis.gl/react-google-maps";
import { useGeolocated } from "react-geolocated";
import Sheet from "react-modal-sheet";

import { GraveMarker } from "./map/grave-marker";
import { UserMarker } from "./map/user-marker";
import ImagesSheet from "./map/images-sheet";
import Distance from "./map/distance";
import DirectionPolyline from "./map/direction-polyline";
import { createClient } from "@supabase/supabase-js";
import RateButton from "./map/rate-button";
import { Button } from "flowbite-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Map = ({ graveId }) => {
  const [graveTarget, setGraveTarget] = useState(null);
  const [isImagesOpen, setImagesOpen] = useState(false);
  const [autoZoomDisabled, setAutoZoomDisabled] = useState(false);

  const getGrave = async () => {
    const { data } = await supabase
      .rpc("get_graves")
      .eq("grave_id", graveId)
      .single();
    setGraveTarget(data);
  };

  useEffect(() => {
    getGrave();
  }, []);

  const dst = useMemo(() => {
    return {
      lat: parseFloat(graveTarget?.latitude ?? 0),
      lng: parseFloat(graveTarget?.longitude ?? 0),
    };
  }, [graveTarget]);

  const {
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled,
    positionError,
  } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    watchLocationPermissionChange: true,
  });

  if (!isGeolocationAvailable) {
    return <div>Your browser does not support Geolocation</div>;
  }

  if (!isGeolocationEnabled) {
    return <div>Geolocation is not enabled</div>;
  }

  if (positionError) {
    return <div>{positionError.message}</div>;
  }

  if (!coords) {
    return <div>Getting the location data&hellip;</div>;
  }

  return (
    <>
      <GoogleMap
        tilt={0}
        mapId={"794c1a71b3e36d6f"}
        mapTypeId="satellite"
        zoom={16}
        center={{
          lat: dst?.lat ?? 0,
          lng: dst?.lng ?? 0,
        }}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      >
        <UserMarker dst={dst} autoZoomDisabled={autoZoomDisabled} />
        <GraveMarker grave={graveTarget} coords={dst} />
        <DirectionPolyline dst={dst} />
      </GoogleMap>

      <div class="fixed bottom-2 right-2 ml-2 max-w-xs flex flex-col items-end space-y-2">
        <Button
          color="dark"
          onClick={() => {
            setAutoZoomDisabled((prev) => !prev);
          }}
        >
          {autoZoomDisabled ? "Turn on auto-center" : "Turn off auto-center"}
        </Button>
        <RateButton dst={dst} graveId={graveId} />
        <Button color="dark" onClick={() => setImagesOpen(true)}>
          View Images
        </Button>
        <Distance dst={dst} />
      </div>

      <Sheet isOpen={isImagesOpen} onClose={() => setImagesOpen(false)}>
        <Sheet.Container className="px-4">
          <Sheet.Header />
          <Sheet.Content
            style={{
              paddingX: "2rem",
            }}
          >
            <Sheet.Scroller draggableAt="both">
              <ImagesSheet graveId={graveId} />
            </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
};

export default Map;
