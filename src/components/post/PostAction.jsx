import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, EllipsisVertical, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { EditPostModal } from "./EditPostModal";
import DeletePostAlert from "./DeletePostAlert";

const PostAction = (props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="bg-destrucive" variant={"noShadow"}>
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white">
        <DropdownMenuLabel>My Post</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="bg-white">
          <EditPostModal data={props.data} className="w-full">
            <div className="z-50 mb-1 flex min-w-[8rem] items-center overflow-hidden rounded-base border-2 border-white bg-white p-1 py-2 pl-1 text-sm font-base text-black hover:border-border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-darkBorder">
              <Edit children className="mr-2 h-4 w-4" />
              <span>Edit Post</span>
            </div>
          </EditPostModal>
          <DeletePostAlert data={props.data}>
            <div className="z-50 mb-1 flex min-w-[8rem] cursor-pointer items-center overflow-hidden rounded-base border-2 border-white bg-white p-1 py-2 pl-1 text-sm font-base text-black hover:border-border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-darkBorder">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete Post</span>
            </div>
          </DeletePostAlert>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostAction;
