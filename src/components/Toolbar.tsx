import React, { useState } from "react"
import logo from "../assets/logo.png"
import { GiHamburgerMenu } from "react-icons/gi"
import { GrCircleQuestion } from "react-icons/gr"
import { BsBarChartLine } from "react-icons/bs"
import { FaCog } from "react-icons/fa"
import Modal from "./Modals/Modal"
import ToggleSwitch from "./Toggle"

interface Props {
  handleMode: () => void
}

const Toolbar: React.FC<Props> =  ({ handleMode }) => {
  const [openInstructionsModal, setOpenInstructionsModal] = useState(false)
  const [openStatisticsModal, setOpenStatisticsModal] = useState(false)
  const [openSettingsModal, setOpenSettingsModal] = useState(false)

  return (
    <>
      <header className="toolbar">
        <div>
          <button className="icons"><GiHamburgerMenu size="23px"/></button>
        </div>
        <div className="logo">
          <img src={logo} alt="Wordle" width="112px" height="32px" />
        </div>
        <div className="toolbar-right">
          <div className="icons">
            <button onClick={() => setOpenInstructionsModal(true)} className="icons">
              <GrCircleQuestion size="28px"/>
            </button>
          </div>
          <div className="icons">
            <button onClick={() => setOpenStatisticsModal(true)} className="icons">
              <BsBarChartLine size="28px"/>
            </button>
          </div>
          <div className="icons">
            <button onClick={() => setOpenSettingsModal(true)} className="icons">
              <FaCog size="28px"/>
            </button>
          </div>
        </div>
      </header>
      <Modal open={openInstructionsModal} onClose={() => setOpenInstructionsModal(false)}><h2>Instructions</h2></Modal>
      <Modal open={openStatisticsModal} onClose={() => setOpenStatisticsModal(false)}><h2>Statistics</h2></Modal>
      <Modal open={openSettingsModal} onClose={() => setOpenSettingsModal(false)}><ToggleSwitch label="Hard Mode" onClick={handleMode} /></Modal>
    </>
  )
}

export default Toolbar