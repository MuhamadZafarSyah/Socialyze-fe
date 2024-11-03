import React from "react";
import { Button } from "../ui/button";
import { Link, Send } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  FacebookIcon,
  FacebookMessengerShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import { toast } from "sonner";
const ShareDrawer = (props) => {
  const shareUrl = `https://socialyze-be.vercel.app/detail-post/${props.data.profile.username}/#${props.data.id}`;

  function handleCopy() {
    toast.success("Copy to clipboard");
    navigator.clipboard.writeText(shareUrl);
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="w-fit bg-yellow active:bg-destrucive" size="sm">
          <Send className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-1/3">
        <div className="mx-auto w-[360px] lg:w-[500px]">
          <DrawerHeader>
            <DrawerTitle className="text-center">
              Share to your friend!
            </DrawerTitle>
          </DrawerHeader>
          <div className="flex h-28 items-center gap-4 overflow-x-auto p-1 px-4">
            <Button className="size-20 shrink-0 p-2">
              <WhatsappShareButton
                url={shareUrl}
                separator=":: "
                className="Demo__some-network__share-button col-center-center"
              >
                <WhatsappIcon size={40} round />
                <span className="mt-1 text-center text-xs font-semibold">
                  WhatsApp
                </span>
              </WhatsappShareButton>
            </Button>
            <Button className="size-20 shrink-0 p-2">
              <FacebookMessengerShareButton
                url={shareUrl}
                separator=":: "
                className="Demo__some-network__share-button col-center-center"
              >
                <FacebookIcon size={40} round />
                <span className="mt-1 text-center text-xs font-semibold">
                  Facebook
                </span>
              </FacebookMessengerShareButton>
            </Button>
            <Button className="size-20 shrink-0 p-2">
              <TelegramShareButton
                url={shareUrl}
                className="Demo__some-network__share-button col-center-center"
              >
                <TelegramIcon size={40} round />
                <span className="mt-1 text-center text-xs font-semibold">
                  Telegram
                </span>
              </TelegramShareButton>
            </Button>
            <Button
              onClick={handleCopy}
              className="col-center-center size-20 shrink-0 p-2"
            >
              <div className="col-center-center rounded-full bg-white p-1">
                <Link size={30} round />
              </div>
              <span className="mt-1 text-center text-xs font-semibold">
                Copy Url
              </span>
            </Button>
            <Button className="size-20 shrink-0 p-2">
              <TwitterShareButton
                url={shareUrl}
                className="Demo__some-network__share-button col-center-center"
              >
                <XIcon size={40} round />
                <span className="mt-1 text-center text-xs font-semibold">
                  X
                </span>
              </TwitterShareButton>
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ShareDrawer;
