import React from 'react';
import ingredientDetailsStyles from './ingredient-details.module.css';
import { useSelector } from '../../services/hooks/hooks';



export const IngredientDetails = () => {
    const {ingredient} = useSelector((state) => state.modalReducer);
    const { image_large, name, calories, proteins, fat, carbohydrates } = ingredient
    return (
        
        <div className={ingredientDetailsStyles.card}>
            <img className={ingredientDetailsStyles.img} src={image_large} alt={name} />
            <div className={ingredientDetailsStyles.details}>
                <h4 className="text text_type_main-medium mt-4 mb-8">{name}</h4>
                <div className={ingredientDetailsStyles.info}>
                    <div className={ingredientDetailsStyles.info__col}>
                        <h6 className={`${ingredientDetailsStyles.subtitle} text text_type_main-default text_color_inactive`}>Калории,ккал</h6>
                        <p className="text text_type_digits-default text_color_inactive">{calories}</p>
                    </div>
                    <div className={ingredientDetailsStyles.info__col}>
                        <h6 className={`${ingredientDetailsStyles.subtitle} text text_type_main-default text_color_inactive`}>Белки, г</h6>
                        <p className="text text_type_digits-default text_color_inactive">{proteins}</p>
                    </div>
                    <div className={ingredientDetailsStyles.info__col}>
                        <h6 className={`${ingredientDetailsStyles.subtitle} text text_type_main-default text_color_inactive`}>Жиры, г</h6>
                        <p className="text text_type_digits-default text_color_inactive">{fat}</p>
                    </div>
                    <div className={ingredientDetailsStyles.info__col}>
                        <h6 className={`${ingredientDetailsStyles.subtitle} text text_type_main-default text_color_inactive`}>Углеводы, г</h6>
                        <p className="text text_type_digits-default text_color_inactive">{carbohydrates}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

