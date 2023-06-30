import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import styles from './Wallet.module.css';

class Wallet extends React.Component {
  render() {
    return (
      <main>
        <section className={ styles.formContainer }>
          <Header />
          <WalletForm />
        </section>
        <Table />
      </main>
    );
  }
}

export default Wallet;
