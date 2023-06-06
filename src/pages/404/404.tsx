import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import styles from './styles.module.css';


export function NotFound404() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/')
  }

  return (
    <article className={styles.main}>
      <div className='mb-12' >
        <h2 className='text text_type_main-large mb-10'>Ошибка 404</h2>
        <p className='text text_type_main-default text_color_inactive mb-10'>Страница не найдена</p>
      </div>
      <Button
                type="primary"
                size="medium"
                htmlType="button"
                aria-label="Вернуться на главную"
                onClick={onClick}
                >
                Вернуться на главную
                </Button>
    </article>
  );
}