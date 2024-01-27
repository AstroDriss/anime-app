import { useEffect, useRef } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

interface Props {
  url: string;
  setTrailerDialog: (pram: boolean) => void;
}

const TrailerDialog = ({ url, setTrailerDialog }: Props) => {
  const trailerRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    trailerRef.current?.showModal();
  }, []);

  return (
    <dialog ref={trailerRef} className="relative aspect-video w-10/12">
      <iframe src={url} className="h-full w-full"></iframe>

      <button
        onClick={() => setTrailerDialog(false)}
        className="absolute right-0 top-0 grid rounded-full bg-light text-center align-middle"
      >
        <IoCloseCircleOutline size={30} />
      </button>
    </dialog>
  );
};

export default TrailerDialog;
