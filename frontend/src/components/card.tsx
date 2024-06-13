import { PlusOne } from "@mui/icons-material";

const Card = (src: string, title: string, description: string): any => {
  return (
    <div className="w-72 h-40 flex flex-col justify-center gap-2 bg-neutral-50 rounded-lg shadow p-2">
      <div className="flex gap-2">
        <img className="bg-neutral-500 w-24 h-24 shrink-0 rounded-lg" src={src} alt="" />
        <div className="flex flex-col">
          <span className="font-bold text-neutral-700 italic">{title}</span>
          <p className="line-clamp-3">
            {description}
          </p>
        </div>
      </div>
      <button className="hover:bg-indigo-700 bg-indigo-500 font-bold text-neutral-50 rounded p-2">
        <PlusOne />
        Solicitar Reposição
      </button>
    </div>
  );
}

export default Card;
