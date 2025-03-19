import Tippy from "@tippyjs/react";
import Button from "../../../components/Button/Button";
import IUser from "../../../interfaces/IUser";
import { useGetPeopleYouMightKnow } from "../../../modules/users/apiClient";
import UserListItem from "../../../modules/users/UserListItem/UserListItem";
import { useEffect, useState } from "react";
import FriendListItemSkeleton from "../UserListItemSkeleton";

const DEFAULT_LIMIT = 5;

const PeopleYouMightKnow = () => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<IUser[]>([]);

  const { data: newUsers = [], isLoading } = useGetPeopleYouMightKnow(
    page,
    DEFAULT_LIMIT
  );

  const hasMore = newUsers.length !== 0;

  useEffect(() => {
    if (newUsers.length === 0) return;
    setUsers((prevUsers) => {
      const newUsersTemp = newUsers.filter((newUser) => {
        const isAlredy = prevUsers.find(
          (prevUser) => prevUser._id === newUser._id
        );
        if (isAlredy) return false;
        return true;
      });
      return prevUsers.concat(newUsersTemp);
    });
  }, [newUsers]);

  return (
    <div className="bg-primary rounded-md p-5 flex flex-col h-full ">
      <h1 className="text-3xl mb-3">People you might know</h1>
      <div className="grow overflow-auto px-2">
        <ul className="space-y-2">
          {isLoading && page === 1 ? (
            <>
              <FriendListItemSkeleton />
              <FriendListItemSkeleton />
              <FriendListItemSkeleton />
              <FriendListItemSkeleton />
              <FriendListItemSkeleton />
            </>
          ) : (
            users.map((user) => {
              return <UserListItem key={user._id} user={user} />;
            })
          )}
        </ul>
      </div>
      <Tippy disabled={hasMore} content="No more people left! ">
        <div>
          <Button
            className="m-auto block w-full mt-4 text-white"
            color="secondary"
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
            disabled={isLoading || !hasMore}
          >
            {isLoading ? "Loading..." : "Show more"}
          </Button>
        </div>
      </Tippy>
    </div>
  );
};

export default PeopleYouMightKnow;
