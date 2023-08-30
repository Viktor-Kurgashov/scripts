import { FC } from "react";
import Sprite from "./sprite.svg";

type SvgProps = {
  id: 'arrow' | 'close' | 'chevron' | 'checkmark',
};

const Svg: FC<SvgProps> = ({ id }) => {
  return (
    <svg>
      <use xlinkHref={`${Sprite}#${id}`} />
    </svg>
  );
};

export default Svg;
