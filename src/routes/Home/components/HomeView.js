import React, {Component, PropTypes} from 'react'
import classes from './HomeView.scss'
import {connect} from 'react-redux'
import {apiCall} from 'store/reducers/pics'

function findMinIndex (arr) {
  var min = arr[0]
  var minIndex = 0
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i]
      minIndex = i
    }
  }
  return minIndex
}

class HomeView extends Component {
  state = {
    shownCount: 5
  };
  static propTypes = {
    apiCall: PropTypes.func,
    pics: PropTypes.array
  };
  componentDidMount () {
    this.props.apiCall()
    window.addEventListener('scroll', ::this.onScroll)
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', ::this.onScroll)
  }
  onScroll () {
    if (this.refs.last && this.refs.last.getBoundingClientRect().top < window.innerHeight) {
      if (this.state.shownCount >= this.props.pics.length) {
        return
      }
      this.setState({
        shownCount: this.state.shownCount + 5
      })
    }
  }
  render () {
    const pics = this.props.pics.slice(0, this.state.shownCount)
    return <div>
      {(() => {
        let output = []
        let offsets = []
        const columns = 3
        for (let i = 0; i < columns; i++) {
          output.push([])
          offsets.push(0)
        }
        for (let i = 0; i < pics.length; i++) {
          if (!pics[i].height) {
            continue
          }
          const minIndex = findMinIndex(offsets)
          offsets[minIndex] += pics[i].height + 10 // 10 is padding space
          if (i < pics.length - 1) {
            output[minIndex].push(<img key={i} src={pics[i].imageUrl} />)
          } else {
            output[minIndex].push(<img key={i} src={pics[i].imageUrl} ref='last' />)
          }
        }
        for (let i = 0; i < columns; i++) {
          output[i] = <div className={classes.column} key={i} children={output[i]} />
        }
        return output
      })()}
    </div>
  }
}

export default connect(state => ({
  pics: state.pics
}), {apiCall})(HomeView)
