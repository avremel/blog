import React, { useEffect } from 'react'
import PaginateBarComponent from './index'

let PaginateBar = null;

const PaginatorWrapper = () => {

  function onChange(newPageNum) {
    PaginateBar.isLoading(true);
    // simulate network request
    setTimeout(() => {
      PaginateBar.setValues({
        pageNum: newPageNum,
        perPage: 50,
        totalRecords: 377,
        totalPages: 8,
      });
      PaginateBar.isLoading(false);
    }, 300);
  }

  useEffect(() => {
    PaginateBar = new PaginateBarComponent({
      selector: '#paginate-bar',
      onChange,
      children: `<div style="color: Tomato; font-style: italic;">MY DASHBOARD</div>`,
    });

    
    PaginateBar.setValues({
      pageNum: 3,
      perPage: 50,
      totalRecords: 377,
      totalPages: 8,
    });

  }, [])

  return (
    <div id='paginate-bar'></div>
  )
}

export default PaginatorWrapper
