import { Component } from 'react'

class Dialog extends Component {
  render() {
    return (
      <div>
        <ImageDialog />
        <LinkDialog />
        <AboutDialog />
        <FormDialog />
        <HistoryDialog />
        <SitDownDialog />
      </div>
    )
  }
}

export default Dialog
