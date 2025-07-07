interface Avatar {
  imageUrl: string;
  profileUrl: string;
}
interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Avatar[];
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={`flex -space-x-4 ${className || ""}`}>
      {avatarUrls.map((url, index) => (
        <a
          key={index}
          href={url.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="h-10 w-10 rounded-full border-2 border-black bg-white"
            src={url.imageUrl}
            width={40}
            height={40}
            alt={`Technology skill icon ${index + 1}`}
            title={`Technology skill icon ${index + 1}`}
          />
        </a>
      ))}
      {(numPeople ?? 0) > 0 && (
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-white text-center text-xs font-medium text-black"
        >
          +{numPeople}
        </div>
      )}
    </div>
  );
};
