import { useEffect } from 'react';
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import styles from './styles.module.css';
import ingredientDetailsStyles from '../../components/ingredient-details/ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../services/actions/ingredients';
import { IIngredient } from '../../services/types/types'
import { FC } from 'react';

export const IngredientDetailsPage: FC = () => {
      
    const { ingredientId } = useParams();
    const ingredients = useSelector((state) => state.ingredientsData.ingredients);

    const ingredient = ingredients.find((item: IIngredient) => item._id === ingredientId);
   if (ingredient){
    return  (
        ingredient && (
        <div>
            <div className={styles.main}>
            <h2 className={`${ingredientDetailsStyles.title} text text_type_main-large`}>Детали ингредиента</h2>

                <div className={ingredientDetailsStyles.card}>
                    <img className={ingredientDetailsStyles.img} src={ingredient.image_large} alt={ingredient.name} />
                    <div className={ingredientDetailsStyles.details}>
                        <h4 className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</h4>
                        <div className={ingredientDetailsStyles.info}>
                            <div className={ingredientDetailsStyles.info__col}>
                                <h6 className={`${ingredientDetailsStyles.subtitle} text text_type_main-default text_color_inactive`}>Калории,ккал</h6>
                                <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
                            </div>
                            <div className={ingredientDetailsStyles.info__col}>
                                <h6 className={`${ingredientDetailsStyles.subtitle} text text_type_main-default text_color_inactive`}>Белки, г</h6>
                                <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
                            </div>
                            <div className={ingredientDetailsStyles.info__col}>
                                <h6 className={`${ingredientDetailsStyles.subtitle} text text_type_main-default text_color_inactive`}>Жиры, г</h6>
                                <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
                            </div>
                            <div className={ingredientDetailsStyles.info__col}>
                                <h6 className={`${ingredientDetailsStyles.subtitle} text text_type_main-default text_color_inactive`}>Углеводы, г</h6>
                                <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
          
        )
      )
    }
    else {
        return null;
    }
}