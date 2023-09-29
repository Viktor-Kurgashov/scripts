import { FC } from "react";
import Sprite from "./sprite.svg";

type SvgProps = {
  id: 'arrow' | 'close' | 'chevron' | 'checkmark' | 'excl',
  className?: string,
};

export const Svg: FC<SvgProps> = ({ id, className }) => {
  return (
    <svg className={className}>
      <use xlinkHref={`${Sprite}#${id}`} />
    </svg>
  );
};
