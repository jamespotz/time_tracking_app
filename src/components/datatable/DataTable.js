import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import Pagination from './Pagination';

const ASC = 1
const DESC = -1

class DataTable extends Component {
  constructor() {
    super()
    this.state = {
      page_size: 10,
      page_count: 0,
      page: 0,
      sortDirection: ASC,
      tableData: []
    }
  }

  componentDidMount() {
    const page_count = Math.ceil(this.props.data.length / this.state.page_size)
    this.setState({ page_count: page_count, tableData: this.props.data })
  }

  componentWillReceiveProps = (nextProps) => {
    const { data } = nextProps
    const page_count = Math.ceil(data.length / this.state.page_size)
    this.setState({ page_count: page_count, tableData: data })
  }

  paginateData = (page) => {
    const {page_size} = this.state
    const start = page * page_size
    const end = (page + 1) * page_size
    return this.state.tableData.slice(start, end)
  }

  sortBy = (e) => {
    const property = e.target.dataset.name
    const { sortDirection } = this.state
    const sortedTableData = this.props.data.sort((a,b) =>{
      const result =  a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
      return result * sortDirection
    })
    const newSortDirection = sortDirection === ASC ? DESC : ASC
    this.setState({tableData: sortedTableData, sortDirection: newSortDirection})
  }

  nextPage = () => {
    const { page, page_size, page_count } = this.state
    if (page_count < page) return 
    this.setState({page: page + 1})
  }

  prevPage = () => {
    const { page } = this.state
    if (page === 0) return
    this.setState({page: page - 1})
  }

  onPageChange = (page) => {
    this.setState({page: page})
  }

  renderTableHeader = () => {
    const tableHead = this.props.headers.map(header => <th onClick={this.sortBy} data-name={header} key={header}>{header.toUpperCase()}</th>)
    return (
      <tr>
        {tableHead}
      </tr>
    )
  }

  renderTableDatas = () => {
    const headers = this.props.headers
    return this.paginateData(this.state.page).map((data, index) => {
      const tableData = headers.map((name, index) => <td key={`${data[name]}-${index}`}>{data[name]}</td>)
      return(
        <tr key={`table-tr-${index}`}>
          { tableData }
        </tr>
      )
    })
  }

  changePageSize = (e) => {
    const page_count = Math.ceil(this.props.data.length / e.target.value)
    this.setState({page_size: e.target.value, page_count: page_count})
  }

  render() {
    const pageSizeOptions = [10, 15, 20, 100].map(n => <option key={n}>{n}</option>)
    if (this.props.data.length > 0) {
      return(
        <div>
          <div className="flex justify-end mr-4 mb-4">
            <select 
              onChange={this.changePageSize} 
              className="bg-transparent py-2 px-1 border-b-2 border-grey"
              value={this.props.page_size}>
              { pageSizeOptions }
            </select>
          </div>
          <table className="table">
            <thead>
              { this.renderTableHeader() }
            </thead>
            <tbody>
              { this.renderTableDatas() }
            </tbody>
          </table>        
          <div className="flex justify-end mr-4 mt-4">
            <Pagination 
              pages={this.state.page_count}
              onNext={this.nextPage}
              onPrev={this.prevPage}
              onPageChange={this.onPageChange}
            />
          </div>
        </div>
      ) 
    } else {
      return null
    }
  }
}

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  headers: PropTypes.arrayOf(PropTypes.string)
}

DataTable.defaultProps = {
  data: [{}],
  headers: []
}

export default DataTable