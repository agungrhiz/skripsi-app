interface CardItemFrontProps {
  image: string;
  title: string;
}

interface CardItemBackProps {
  content: string;
}

export function CardItemFront({ image, title }: CardItemFrontProps) {
  return (
    <div
      className="grid h-80 items-end rounded-lg shadow-xl"
      style={{
        backgroundImage: `linear-gradient(40deg, rgba(67, 138, 243, 0.6), rgba(255, 242, 166, 0.4)), url('${image}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <h2 className="select-none text-2xl tracking-widest text-white uppercase">
        {title}
      </h2>
    </div>
  );
}

export function CardItemBack({ content }: CardItemBackProps) {
  return (
    <div className="grid h-80 items-center rounded-lg shadow-xl bg-white">
      <p className="select-none text-sm text-blue-600 m-6">
        {content}
      </p>
    </div>
  );
}
