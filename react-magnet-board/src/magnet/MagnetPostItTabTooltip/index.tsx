import {
  styleMagnetPostItTabTooltip,
  styleMagnetPostItTabTooltipDesc,
  styleMagnetPostItTabTooltipTitle,
  styleMagnetPostItTabTooltipWrap
} from "@components/magnet/MagnetPostItTabTooltip/styles.css";
import {ReactNode} from "react";

interface IProps{
  title: string;
  left: number;
  isShow: boolean;
  desc?: ReactNode;
  width?: number;

}
const MagnetPostItTabTooltip: React.FC<IProps> = ({title,left, desc, width=200}) => {
  return (
    <div className={styleMagnetPostItTabTooltipWrap} style={{gridTemplateColumns:`minmax(0, ${left}px) ${width}px`}}>
      <div></div>
      <div className={styleMagnetPostItTabTooltip}>
        <div className={styleMagnetPostItTabTooltipTitle}>
          {title}
        </div>
        {desc &&
          <div className={styleMagnetPostItTabTooltipDesc}>
            {desc}
          </div>
        }
      </div>
    </div>
  );
};

export default MagnetPostItTabTooltip;
