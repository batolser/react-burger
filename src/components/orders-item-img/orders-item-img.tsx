import clsx from "clsx";
import { FC } from "react";
import styles from './styles.module.css';

interface IngredientIconProps {
  srcSet?: string;
  src?: string;
  alt?: string;
  overflow?: number;
  extraClass?: string;
  // key?: string;
}

export const IngredientIcon: FC<IngredientIconProps> = ({
  srcSet,
  src,
  alt,
  overflow = 0,
  extraClass,
  // key
}) => {
  return (
    <div className={clsx(styles.container, extraClass)}>
      <div>
        <picture className={styles.picture}>
          <source srcSet={srcSet} />
          <img src={src} alt={alt} width="112" height="56" />
        </picture>
        {overflow > 0 && (
          <div
            className={clsx(styles.container, styles.picture, styles.overflow)}
          >
            <div className={clsx(styles.picture, "text text_type_main-small")}>
              +{overflow}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

  