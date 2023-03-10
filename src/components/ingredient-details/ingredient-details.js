import React from 'react';
import ingredientDetailsStyles from './ingredient-details.module.css';
import { infoCardPropTypes } from '../../utils/types'



export const IngredientDetails = ({ item }) => {
    return (
        <div className={ingredientDetailsStyles.card}>
            <img className={ingredientDetailsStyles.img} src={item.image_large} alt={item.name} />
            <div className={ingredientDetailsStyles.details}>
                <h4 className="text text_type_main-medium mt-4 mb-8">{item.name}</h4>
                <div className={ingredientDetailsStyles.info}>
                    <div className={ingredientDetailsStyles.info__col}>
                        <h6 className={`${ingredientDetailsStyles.subtitle} text text_type_main-default text_color_inactive`}>Калории,ккал</h6>
                        <p className="text text_type_digits-default text_color_inactive">{item.calories}</p>
                    </div>
                    <div className={ingredientDetailsStyles.info__col}>
                        <h6 className={`${ingredientDetailsStyles.subtitle} text text_type_main-default text_color_inactive`}>Белки, г</h6>
                        <p className="text text_type_digits-default text_color_inactive">{item.proteins}</p>
                    </div>
                    <div className={ingredientDetailsStyles.info__col}>
                        <h6 className={`${ingredientDetailsStyles.subtitle} text text_type_main-default text_color_inactive`}>Жиры, г</h6>
                        <p className="text text_type_digits-default text_color_inactive">{item.fat}</p>
                    </div>
                    <div className={ingredientDetailsStyles.info__col}>
                        <h6 className={`${ingredientDetailsStyles.subtitle} text text_type_main-default text_color_inactive`}>Углеводы, г</h6>
                        <p className="text text_type_digits-default text_color_inactive">{item.carbohydrates}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

IngredientDetails.propTypes = {
    item: infoCardPropTypes.isRequired
};