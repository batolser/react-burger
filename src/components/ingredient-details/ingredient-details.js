import React from 'react';
import ingredientDetailsStyles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';



export const IngredientDetails = () => {
    const ingredient = useSelector(state => state.modalReducer.ingredient);
    return (
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
    );
}

