import { useState } from "react";
import noImg from "/images/no-image.png";
import { Loader } from "lucide-react";

const ThumbnailPostCard = (props) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="mx-auto max-w-xs rounded-lg border-2 border-border">
      <div className="rounded-xl bg-white p-1 shadow-md">
        {loading && (
          <div className="relative flex aspect-square size-full items-center justify-center overflow-hidden rounded-lg border-2 border-border">
            <Loader className="animate-spin" />
          </div>
        )}
        <img
          src={props.data.postImage || noImg}
          alt={props.data.caption}
          className={`relative aspect-square size-full overflow-hidden rounded-lg border-2 border-border object-cover ${loading ? "hidden" : "block"}`}
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
};

export default ThumbnailPostCard;
