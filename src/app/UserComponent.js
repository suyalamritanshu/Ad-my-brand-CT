import React, { useState } from "react";
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Link from "next/link";


const UserComponent = ({ item, userList, handleChange, showBorderColor }) => {
    const [open, setOpen] = useState(false);
    userList.map((ul) => {
        console.log(ul)
    })

    return (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column'

        }}>
            <div  >
                <Menu id="menuButton" menuButton={<MenuButton style={{ width: '100%', padding: '5px', border: showBorderColor, borderRadius: '4px', fontSize: 16 }}>


                    <div onClick={() => setOpen(true)}>
                        <p>
                            {!Object.keys(item).length ? "Please select a user" : "Selected click to change"}
                        </p>
                    </div>
                    <div onClick={() => setOpen(true)} >
                    </div>

                </MenuButton>} transition

                >
                    {userList.map((ul) => (
                        <MenuItem
                            onClick={() => {
                                handleChange(ul);
                                setOpen(false);
                            }}
                            className="menu_item"
                            key={ul.id}
                        >

                            <div id="user_item">
                                <p id="user_id">{ul.name}</p>

                            </div>

                        </MenuItem>
                    ))}
                </Menu>

            </div>
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <p>
                    {!Object.keys(item).length ? "No user selected" : "Selected User: " + item.name}
                </p>
                <p>
                    {!Object.keys(item).length ? "No user id" : "User Id: " + item.id}

                </p>

                <p>
                    {!Object.keys(item).length ? "Select user to get location" :

                        <Link target="_blank" style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }} href={`https://maps.google.com?q=${item.lat},${item.lng}`}>
                            Show location
                        </Link>


                    }

                </p>
            </div>
        </div>
    );
};

export default UserComponent;

