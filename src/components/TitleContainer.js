import React, { Component } from 'react';
import styles from './TitleContainer.module.css';

import moneyWithWings from '../images/emoji_money-with-wings.png';

export default class TitleContainer extends Component {
  render() {
    return (
      <section className={ styles.titleContainer }>
        <span className={ styles.imgContainer }>
          <img
            alt="Maço de dinheiro com asas"
            src={ moneyWithWings }
          />
        </span>
        <h1>
          Trybe
          <span>Wallet</span>
        </h1>
      </section>
    );
  }
}
