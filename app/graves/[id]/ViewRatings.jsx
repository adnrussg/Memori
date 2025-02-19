"use client";
import { MdRateReview } from "react-icons/md";
import { useState, useMemo, useRef } from "react";
import Sheet, { SheetRef } from "react-modal-sheet";
import { Button, Rating } from "flowbite-react";
import Avatar from "../components/UserAvatar";
const AVATAR_URL =
  "https://plmqhcualnnsirfqjcsj.supabase.co/storage/v1/object/public/avatars/";

const ViewRatings = ({ ratings }) => {
  const [isRatingsOpen, setRatingsOpen] = useState(false);
  const averageRatings = useMemo(() => {
    return ratings?.length ?? 0 > 0
      ? Math.round(
          (ratings.reduce(function (sum, value) {
            return sum + parseInt(value.rating);
          }, 0) /
            ratings.length) *
            100
        ) / 100 // Changes are here
      : 0;
  }, [ratings]);

  return (
    <>
      <Button
        className="basis-1/2 whitespace-nowrap"
        color="gray"
        onClick={() => setRatingsOpen(true)}
      >
        <MdRateReview className="mr-2 h-4 w-4" />
        View Ratings
      </Button>
      <Sheet
        isOpen={isRatingsOpen}
        onClose={() => setRatingsOpen(false)}
        snapPoints={[600, 400, 100, 0]}
        initialSnap={0}
      >
        <Sheet.Container className="px-4 bg-slate-300">
          <Sheet.Header />
          <Sheet.Header>
            <Rating>
              <Rating.Star filled={averageRatings >= 1} />
              <Rating.Star filled={averageRatings >= 2} />
              <Rating.Star filled={averageRatings >= 3} />
              <Rating.Star filled={averageRatings >= 4} />
              <Rating.Star filled={averageRatings >= 5} />
              <p className="ml-2 font-bold">
                {averageRatings} out of 5 ratings
              </p>
            </Rating>
          </Sheet.Header>
          <Sheet.Content
            style={{
              paddingX: "2rem",
            }}
          >
            <Sheet.Scroller draggableAt="both">
              {/* Rating content here */}
              {ratings?.map(
                (rating) =>
                  !!rating.user_id?.id && (
                    <div key={rating.id} className="flex gap-4">
                      <div>
                        {rating.user_id?.avatar_url ? (
                          <Avatar
                            img={AVATAR_URL + `${rating.user_id?.avatar_url}`}
                            rounded
                          />
                        ) : (
                          <Avatar rounded />
                        )}
                      </div>
                      <div>
                        <strong>
                          <Rating>
                            {rating.user_id?.username} - {rating.rating}{" "}
                            <Rating.Star filled />
                          </Rating>
                        </strong>
                        <p>{rating.comment}</p>
                      </div>
                    </div>
                  )
              )}
            </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
};

export default ViewRatings;
