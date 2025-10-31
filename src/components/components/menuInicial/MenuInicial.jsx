import React from 'react'
import styles from "./MenuInicial.module.css";

export const MenuInicial = () => {
  return (
    <div className={styles.container}>
      <h1>Menu</h1>
      <div>
      <button>Meu Clã</button>
      <button>Jogar</button>
      <button>Rankings</button>
      </div>
    </div>
  )
}
