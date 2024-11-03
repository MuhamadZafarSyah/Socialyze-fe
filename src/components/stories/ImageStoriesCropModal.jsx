import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "@/utils/setCanvasPreview";
import "react-image-crop/dist/ReactCrop.css";

const ASPECT_RATIO = 2 / 3;
const MIN_DIMENSION = 200;

const ImagePostCropModal = ({ updateStoriesImage, className, children }) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 200 x 200 pixels.");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height,
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const generateFileName = () => {
    const timestamp = new Date();
    const random = Math.floor(Math.random() * 1000); // tambahan random number
    return `image_${timestamp.getTime()}_${random}.jpg`;
  };

  const handleSave = () => {
    setCanvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height),
    );

    previewCanvasRef.current.toBlob((blob) => {
      // Create a File object from the Blob with random filename
      const fileName = generateFileName();
      const croppedFile = new File([blob], fileName, {
        type: "image/jpeg",
        lastModified: new Date().getTime(),
      });

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(croppedFile);

      const fileInput = document.querySelector("#snapImage");
      if (fileInput) {
        fileInput.files = dataTransfer.files;

        const changeEvent = new Event("change", { bubbles: true });
        fileInput.dispatchEvent(changeEvent);
      }

      const objectUrl = URL.createObjectURL(blob);
      updateStoriesImage(objectUrl);
    }, "image/jpeg");
  };

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className={`size-10 cursor-pointer rounded-full border-2 border-border bg-white p-2 lg:left-52 ${className}`}
      >
        {children}
      </DialogTrigger>
      <DialogContent className="overflow-scroll sm:max-w-[425px] lg:overflow-hidden">
        <DialogHeader>
          <DialogTitle>Your Image</DialogTitle>
        </DialogHeader>

        <label className="mb-3 block w-full">
          <Button className="sr-only">Choose profile photo</Button>
          <input
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            className="text-smtransition-all block w-full border-2 border-border bg-white p-2 shadow-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 active:translate-x-boxShadowX active:translate-y-boxShadowY active:shadow-none disabled:pointer-events-none disabled:opacity-50 dark:border-darkBorder dark:shadow-dark dark:active:shadow-none"
          />
        </label>
        {error && <p className="text-xs text-red-400">{error}</p>}
        {imgSrc && (
          <div className="flex flex-col items-center">
            <ReactCrop
              crop={crop}
              onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
              keepSelection
              aspect={ASPECT_RATIO}
              minWidth={MIN_DIMENSION}
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Upload"
                style={{ maxHeight: "70vh" }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>
        )}
        {crop && (
          <canvas
            ref={previewCanvasRef}
            className="mt-4"
            style={{
              display: "none",
              border: "1px solid black",
              objectFit: "contain",
              width: 150,
              height: 150,
            }}
          />
        )}
        <DialogFooter>
          <DialogClose>
            <Button onClick={handleSave}> Add Image</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePostCropModal;
