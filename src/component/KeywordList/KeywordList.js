import React, { Component, Fragment } from 'react';
import styles from './KeywordList.scss';
import ReactTable from "react-table";


class KeywordList extends Component {
  render() {
    const { keywordLists, isLoading, isError } = this.props
    const { data } = keywordLists;
    const columns = [
      {
        Header: '연관키워드',
        accessor: 'relKeyword'
      },
      {
        Header: '월간검색수',
        columns: [
          {
            Header: 'PC',
            accessor: 'monthlyPcQcCnt'
          },
          {
            Header: '모바일',
            accessor: 'monthlyPcQcCnt'
          },
        ]
      },
      {
        Header: '월평균클릭수',
        columns: [
          {
            Header: 'PC',
            accessor: 'monthlyAvePcClkCnt'
          },
          {
            Header: '모바일',
            accessor: 'monthlyAveMobileClkCnt'
          },
        ]
      },
      {
        Header: '월평균클릭률',
        columns: [
          {
            Header: 'PC',
            accessor: 'monthlyAvePcCtr'
          },
          {
            Header: '모바일',
            accessor: 'monthlyAveMobileCtr'
          },
        ]
      },      
      {
        Header: '경쟁정도',
        accessor: 'compIdx'
      },
      {
        Header: '월평균광고노출수',
        accessor: 'plAvgDepth'
      },  
    ]
    console.log(data)
    return (
      <Fragment>
      {
        !isLoading ?
        <Fragment>
          <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={10}
            className="-striped -highlight"
          >
          </ReactTable>
        </Fragment>
        : <h3>Loading...</h3>
      }
      </Fragment>
    );
  }
}

export default KeywordList;