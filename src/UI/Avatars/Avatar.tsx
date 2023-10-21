"use client";

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image';
import { motion } from "framer-motion";
import axios from 'axios';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    },
  margin: 0
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

interface Props {
    onAvatarSelected: (avatar: string) => void
    numberOfItems: number
};

interface ICharacter {
  id: number
  name: string
  avatar: string
  isSelected: boolean
};

export default function Avatars(props: Props) {

  const [avatars, setAvatars] = React.useState<Array<ICharacter>>([]);

  const selectAvatarHandler = (avatar: string, id: number) => {
    props.onAvatarSelected(avatar);

    // unselect all and only select one
    const temp = avatars.map((avatar) => {
        if(avatar.id == id) avatar.isSelected = true;
        else avatar.isSelected = false;
        return avatar;
    });
    
    setAvatars(temp);
  }
 
  React.useEffect(() => {
    const url = "https://rickandmortyapi.com/api/character";
    axios.get(url)
    .then((res) => {
      const { results } = res.data;
      for(let iter = 0; iter < results.length; iter++) {
        const { id, name, image } = results[iter];
        const newCharacter: ICharacter = { id: id, name: name, avatar: image, isSelected: (iter == 0) ? true : false };
        setAvatars((prev) => [...prev, newCharacter]);
      }
    })
    .catch((error) => {
        console.log(error);
    });
  });    

  return (
    <motion.div className="container" variants={container} initial="hidden" animate="visible">
        <ImageList cols={3}>
            {avatars.slice(0, props.numberOfItems).map(({ id, avatar, isSelected }) => (
            <motion.div className="item" variants={item} key={id}>
              <ImageListItem onClick={() => selectAvatarHandler(avatar, id)} 
                sx={{ padding: '5px', cursor: 'pointer', height: "70px", width: "70px", borderRadius: "50%", border: (isSelected == true) ? ".5px solid blue" : "" }}>
                  <Image
                    src={avatar}
                    alt={avatar}
                    width={70}
                    height={70}
                    style={{ borderRadius: "50%" }}
                    />
              </ImageListItem>
            </motion.div>
            ))}
        </ImageList>
      </motion.div>
  );
}
