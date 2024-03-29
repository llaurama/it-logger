import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getLogs } from '../../actions/logActions';

import LogItem from './LogItem';
import Preloader from '../layout/Preloader';

const Logs = ({ logs, loading, getLogs }) => {
   useEffect(() => {
      getLogs();
      // eslint-disable-next-line
   }, []);

   if (loading || logs === null) return <Preloader />;

   return (
      <ul className="collection with-header">
         <li className="collection-header">
            <h4 className="center">System Logs</h4>
         </li>
         {!loading && logs.length === 0 ? (
            <p className="center">No logs to show</p>
         ) : (
            logs.map(log => <LogItem log={log} key={log.id} />)
         )}
      </ul>
   );
};

Logs.propTypes = {
   logs: PropTypes.array.isRequired,
   loading: PropTypes.bool.isRequired,
   getLogs: PropTypes.func.isRequired
};

const mapToStateToProps = state => ({
   logs: state.log.logs,
   loading: state.log.loading
});

export default connect(
   mapToStateToProps,
   { getLogs }
)(Logs);
