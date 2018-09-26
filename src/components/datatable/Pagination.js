import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Pagination extends Component {
  constructor() {
    super()
    this.state = {
      pages: [],
      currentPage: 0
    }
  }

  componentDidMount() {
    this.setPage(this.props.pages)
  }

  componentWillReceiveProps(nextProps) {
    const { pages } = nextProps
    this.setPage(pages)  
  }

  setPage = (pages) => {
    const pageArray = []
    for(let i = 0; i <= pages - 1; i++) {
      pageArray.push(i)
    }
    this.setState({pages: pageArray})
  }

  getPages = () => {
    const self = this
    const defaultCss = "py-1 px-2 border rounded cursor-pointer"
    return self.state.pages.map(num => {
      return(
        <li 
          onClick={()=> { self.onPageChanges(num) }}
          className={ self.state.currentPage === num ? `bg-blue text-white ${defaultCss}` : defaultCss }
          key={`page-${num}`}
        >
          {num + 1}
        </li>
      )
    })
  }

  onPageChanges = (num) => {
    this.props.onPageChange(num)
    this.setState({ currentPage: num})
  }

  onPrevPage = () => {
    this.props.onPrev()
    const current = this.state.currentPage - 1
    if (current < 0) { return }
    this.setState({ currentPage: current})
  }

  onNextPage = () => {
    this.props.onNext()
    const current = this.state.currentPage + 1
    if (current > (this.state.pages.length - 1)) { return }
    this.setState({ currentPage: current })
  }

  render() {
    const { onNext, onPrev } = this.props
    if (this.props.pages >= 2) {
      return(
        <div>
          <ul className="list-reset flex">
            <button className="mr-2" disabled={this.state.currentPage === 0} onClick={this.onPrevPage}>Prev</button>
            { this.getPages() }
            <button onClick={this.onNextPage} disabled={this.state.currentPage === this.state.pages.length - 1} className="ml-2">Next</button>
          </ul>
        </div>
      )
    } else {
      return null
    }
  }

}

Pagination.propTypes = {
  pages: PropTypes.number,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired
}

Pagination.defaultProps = {
  pages: 0
}

export default Pagination
 