import React, { useState } from "react"
import logo from "../assets/logo.png"
import { GiHamburgerMenu } from "react-icons/gi"
import { GrCircleQuestion } from "react-icons/gr"
import { BsBarChartLine } from "react-icons/bs"
import { FaCog } from "react-icons/fa"
import Modal from "./Modals/Modal"

const Toolbar =  () => {
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
      <Modal open={openInstructionsModal} onClose={() => setOpenInstructionsModal(false)}>instructions</Modal>
      <Modal open={openStatisticsModal} onClose={() => setOpenStatisticsModal(false)}>statistics</Modal>
      <Modal open={openSettingsModal} onClose={() => setOpenSettingsModal(false)}>settings</Modal>
    </>
  )
}

export default Toolbar