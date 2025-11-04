import React from 'react'
import styles from './Erro.module.css'

export const Error = () => {
  return (
    <>
    <div className={styles.paginaErro}>
    <h1>Erro 404</h1>

    <div className={styles.container}>
    <h2>Página não encontrada</h2>
    <h2>Por que ao inves de futricar, você não vai jogar um quiz divertido?</h2>
    </div>
    </div>
    </>
  )
}
