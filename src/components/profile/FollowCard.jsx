import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { Card } from "../ui/card";

const FollowCard = (props) => {
  const { className } = props;

  return (
    <Card className={`${className} mx-auto w-full max-w-sm p-4`}>
      <Link
        to={`/${props.data.username}`}
        className="flex items-center space-x-2"
      >
        <Avatar className="!no-style center-center size-11">
          <AvatarImage
            className="size-10 rounded-full border border-border object-cover"
            src={props.data.avatar}
          />
          <AvatarFallback className="size-10 rounded-full border border-border object-cover text-xs">
            PFP
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h1 className="text-xs font-semibold">{props.data.username} </h1>
          <h2 className="text-[10px]">{props.data.name}</h2>
        </div>
      </Link>
    </Card>
  );
};

export default FollowCard;
