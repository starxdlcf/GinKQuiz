import React from 'react'
import { Link } from 'react-router-dom'
import styles from './PerfilIcon.module.css'

import Narci from "../../../assets/icons/narciicon.png";

const PerfilIcon = () => {
  return (
     <Link to="perfil"><img id={styles.narci} src={Narci} alt="Perfil" /></Link>
  )
}

export default PerfilIcon