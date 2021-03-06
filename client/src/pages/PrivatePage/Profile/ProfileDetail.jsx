import React, { useContext, useState, useEffect } from 'react'

import { AppContext } from '../../../components/context/GlobalContext';
import { API } from '../../../config/api';

import { Card, ListGroup, Form, Button, Modal } from 'react-bootstrap'

import emailIcon from '../../../assets/icon/email.png'
import genderMale from '../../../assets/icon/genderMale.png'
import phoneIcon from '../../../assets/icon/phone.png'
import addressIcon from '../../../assets/icon/address.png'
import profileDefault from '../../../assets/profileDefault.jpg'


const ProfileDetail = () => {
   const [state] = useContext(AppContext)
   const [show, setShow] = useState(false);

   const [editButton, setEditButton] = useState(false);
   const [loading, setLoading] = useState(true)

   const [preview, setPreview] = useState(true)
   const [previewImage, setPreviewImage] = useState({
      file : null,
   })

   const userId = state.user.id
   
   const [editProfil, setEditProfil] = useState({
      email: "",
      gender: "",
      phone: "",
      address: "",
      profilImage: "",
   });
   
   const user = async () => {
      setLoading(true)
      const result = await API.get("/user/"+userId)
      setEditProfil(result.data.data.user)
      setLoading(false)
   }
   
   const handleClose = () => {
      setShow(false);
      setEditButton(false);
      user()
   }
   
   const onEdit = (e) => {
      user()
      setPreview(!preview)
      setEditButton(!editButton);
   }
   
   const onChangeImage = (e) => {
      setEditProfil({ ...editProfil, [e.target.name]: e.target.files[0] })      
      setPreviewImage({
         file: URL.createObjectURL(e.target.files[0])
      })
      setPreview(true)
   }
   
   const onChange = (e) => {
      setEditProfil({ ...editProfil, [e.target.name]: e.target.value })
      console.log("Data Diubah!")
   };

   const { email, gender, phone, address, profilImage } = editProfil

   const onSubmit = async (e) => {
      setShow(true);
      e.preventDefault();
      try {
         const form = new FormData();
         
         form.append("email", email);
         form.append("gender", gender);
         form.append("phone", phone);
         form.append("address", address);
         form.append("profilImage", profilImage);
         
         const config = {
            header: {
               "Content-Type": "application/json",
            },
         };

         if (preview) {
            await API.post("/user/edit", form, config);
         } else {
            await API.post("/user/edit-noimage", editProfil, config);
         }
         
      } catch (error) {
         console.log("Error on submit")
      }
   }

   useEffect(() => {
      user()
   }, [])

   return (
         <div className="ProfileDetail col-sm-12">
            <Card body className={editButton ? "border-0 d-none" : "border-0"}>
               <div className="row">
               <div className="col-md-8">
                  <ListGroup horizontal>
                     <ListGroup.Item className="col-1 border-0 bg-transparent">
                        <img className="" src={emailIcon} alt="" />
                     </ListGroup.Item>
                     <ListGroup.Item className="text-left border-0 bg-transparent">
                        <p className="m-0 font-weight-bold">
                           {loading ? "Wait..." : editProfil.email}
                        </p>
                        <small className="text-muted">
                           Email
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
                  <ListGroup horizontal>
                     <ListGroup.Item className="col-1 border-0 bg-transparent">
                        <img className="" src={genderMale} alt="" />
                     </ListGroup.Item>
                     <ListGroup.Item className="text-left border-0 bg-transparent">
                        <p className="m-0 font-weight-bold">
                           {loading ? "Wait..." : editProfil.gender}
                        </p>
                        <small className="text-muted">
                           Gender
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
                  <ListGroup horizontal>
                     <ListGroup.Item className="col-1 border-0 bg-transparent">
                        <img className="" src={phoneIcon} alt="" />
                     </ListGroup.Item>
                     <ListGroup.Item className="text-left border-0 bg-transparent">
                        <p className="m-0 font-weight-bold">
                           {loading ? "Wait..." : editProfil.phone}
                        </p>
                        <small className="text-muted">
                           Mobile Phone
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
                  <ListGroup horizontal>
                     <ListGroup.Item className="col-1 border-0 bg-transparent">
                        <img className="" src={addressIcon} alt="" />
                     </ListGroup.Item>
                     <ListGroup.Item className="text-left border-0 bg-transparent">
                        <p className="m-0 font-weight-bold">
                           {loading ? "Wait..." : editProfil.address}
                        </p>
                        <small className="text-muted">
                           Address
                        </small>
                     </ListGroup.Item>
                  </ListGroup>
               </div>
               <div className="col-md-4">
                  <ListGroup className="">
                     <img  src={loading ? "Wait..." : editProfil.profilImage === null ? profileDefault : "http://localhost:5000/profiles/"+editProfil.profilImage }
                           style={{
                              width: "15vw",
                              marginLeft: "auto",
                              marginRight: "auto"
                           }} 
                           alt="" 
                        />
                  </ListGroup>
                  <ListGroup className="mt-2">
                     <div className="btn btn-danger" onClick={(e) => onEdit(e)}>Edit Profile</div>
                  </ListGroup>
               </div>
               </div>
            </Card>
   {/* ---------------------------------------------------------------------------------------------- */}
            <Card body className={editButton ? "border-0" : "border-0 d-none"}>
               <Form onSubmit={(e) => onSubmit(e)}>
                  <Form.Group>
                  <div className="row">
                     <div className="col-md-8">
                        <ListGroup horizontal>
                           <ListGroup.Item className="col-1 border-0 bg-transparent">
                              <img className="" src={emailIcon} alt="" />
                           </ListGroup.Item>
                           <ListGroup.Item className="text-left border-0 bg-transparent">
                              <p className="m-0 font-weight-bold">
                                 <Form.Control plainText readOnly placeholder={loading ? "Wait..." : editProfil.email ? editProfil.email : "Enter Phone Number"} />
                              </p>
                              <small className="text-muted">
                                 Email
                              </small>
                           </ListGroup.Item>
                        </ListGroup>
                        <ListGroup horizontal>
                           <ListGroup.Item className="col-1 border-0 bg-transparent">
                              <img className="" src={genderMale} alt="" />
                           </ListGroup.Item>
                           <ListGroup.Item className="text-left border-0 bg-transparent">
                              <p className="m-0 font-weight-bold">
                                 <Form.Check
                                    type="radio"
                                    label="Male"
                                    value="Male"
                                    name="gender"
                                    id="formHorizontalRadios1"
                                    onChange={(e) => onChange(e)}
                                 />
                                 <Form.Check
                                    type="radio"
                                    label="Female"
                                    value="Female"
                                    name="gender"
                                    id="formHorizontalRadios2"
                                    onChange={(e) => onChange(e)}
                                 />
                              </p>
                              <small className="text-muted">
                                 Gender
                              </small>
                           </ListGroup.Item>
                        </ListGroup>
                        <ListGroup horizontal>
                           <ListGroup.Item className="col-1 border-0 bg-transparent">
                              <img className="" src={phoneIcon} alt="" />
                           </ListGroup.Item>
                           <ListGroup.Item className="text-left border-0 bg-transparent">
                              <p className="m-0 font-weight-bold">
                                 <Form.Control className="bgTextbox mb-3" name="phone" type="text" placeholder={loading ? "Wait..." : editProfil.phone ? editProfil.phone : "Enter Phone Number"} onChange={(e) => onChange(e)} />
                              </p>
                              <small className="text-muted">
                                 Mobile Phone
                              </small>
                           </ListGroup.Item>
                        </ListGroup>
                        <ListGroup horizontal>
                           <ListGroup.Item className="col-1 border-0 bg-transparent">
                              <img className="" src={addressIcon} alt="" />
                           </ListGroup.Item>
                           <ListGroup.Item className="text-left border-0 bg-transparent">
                              <p className="m-0 font-weight-bold">
                                 <Form.Control className="bgTextbox mb-3" name="address" type="text" placeholder={loading ? "Wait..." : editProfil.address ? editProfil.address : "Enter Address"} onChange={(e) => onChange(e)} />
                              </p>
                              <small className="text-muted">
                                 Address
                              </small>
                           </ListGroup.Item>
                        </ListGroup>
                     </div>
                     <div className="col-md-4">
                        <ListGroup>
                           <Form.Group>
                              <div>
                                 <label for="profilImage">
                                    <div style={{
                                       position: "relative",
                                       textAlign: "center",
                                       color: "white"
                                    }}>
                                       <img  className={preview ? "d-none" : ""}
                                             src={editProfil.profilImage === null ? profileDefault : "http://localhost:5000/profiles/"+editProfil.profilImage}
                                             style={{
                                                width: "15vw",
                                                marginLeft: "auto",
                                                marginRight: "auto",
                                                filter: "brightness(75%)"
                                                }}
                                             />
                                       <div style={{
                                          fontWeight: "500",
                                          border: "5px",
                                          position: "absolute",
                                          top: "50%",
                                          left: "50%",
                                          transform: "translate(-50%, -50%)"
                                       }}>
                                          Upload File
                                       </div>
                                    </div>
                                    <img  className={preview ? "" : "d-none"}
                                          src={previewImage.file}
                                          style={{
                                             width: "15vw",
                                             marginLeft: "auto",
                                             marginRight: "auto",
                                             filter: "brightness(75%)"
                                             }}
                                          />
                                 </label>
                                 <input onChange={(e) => onChangeImage(e)} name="profilImage" id="profilImage" type="file" style={{display: "none"}} />
                              </div>
                           </Form.Group>
                        </ListGroup>
                        <ListGroup className="mt-2">
                           <Button className="btn btn-danger" type="submit">Save</Button>
                        </ListGroup>
                        <ListGroup className="mt-2">
                           <Button variant="light" type="" onClick={(e) => onEdit(e)}>Cancel</Button>
                        </ListGroup>
                     </div>
                     </div>
                  </Form.Group>
               </Form>
            </Card>
            
            <Modal show={show} onHide={handleClose}>
            <Modal.Body className="text-success">Profil update succesfully!</Modal.Body>
            <Modal.Footer>
               <Button variant="primary" onClick={handleClose}>
                  Ok
               </Button>
            </Modal.Footer>
            </Modal>

         </div>
   )
}

export default ProfileDetail
