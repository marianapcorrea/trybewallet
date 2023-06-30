import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import styles from './Wallet.module.css';

class Wallet extends React.Component {
  render() {
    return (
      <main className={ styles.mainContent }>
        <section className={ styles.formContainer }>
          <Header />
          <WalletForm />
        </section>
        <section className={ styles.tableContainer }>
          <Table />
        </section>
      </main>
    );
  }
}

export default Wallet;
