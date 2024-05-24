import React from 'react';
import { EditOutlined, HeartOutlined, DeleteOutlined, MailOutlined, PhoneOutlined,HeartFilled, GlobalOutlined } from '@ant-design/icons';
import { Card } from 'antd';
const { Meta } = Card;

const CardComponent = ({ users,handleModal,toggleLike,likedUsers,handleDelete }) => (
    
    <div className='flex flex-wrap justify-center sm:justify-start gap-4 md:gap-6 lg:gap-12'>

        {
            users?.map((user) => (
                    <Card
                        key={user.id}
                        style={{
                            width: 300,
                        }}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                        cover={
                            <img
                                alt="example"
                                src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${user.username}`}
                                
                            />
                        }
                        actions={[
                            likedUsers.includes(user.id) 
                            ? <HeartFilled key="heart" style={{ color: 'red' }} onClick={() => toggleLike(user.id)} />
                            : <HeartOutlined key="heart" onClick={() => toggleLike(user.id)} />,
                            <EditOutlined key="edit" onClick={(()=>handleModal(user.id))}/>,
                            <DeleteOutlined onClick={()=>handleDelete(user.id)}/>
                        ]}
                    >
                        <Meta
                            title={user.name}
                        />
                        <Meta
                            avatar={<MailOutlined />}
                            title={user.email}
                        />
                        <Meta
                            avatar={<PhoneOutlined />}
                            title={user.phone}
                        />
                        <Meta
                            avatar={<GlobalOutlined />}
                            title={user.website}
                        />
                    </Card>
            ))
        }
    </div>

);
export default CardComponent;