import React, {useContext} from 'react'
import {Button} from 'react-bootstrap'
import { AppContext } from '../../../components/context/GlobalContext'

const Dashboard = () => {
   const [state, dispatch] = useContext(AppContext)
   console.log("iam in dashboard page!")
   const logout = () => {
      dispatch({
         type: "LOGOUT"
      })
   }

   return (
      <div className="text-center">
         <Button className="d-block" onClick={() => logout()}>
            Logout
         </Button>
         Dashboard
      </div>
   )
}

export default Dashboard
