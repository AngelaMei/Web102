import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react'
import { supabase } from '../client'
import './createPost.css'

const EditPost = ({data}) => {

    const {id} = useParams();
    const [post, setPost] = useState({id: null, name: "", character: "", color: "", level: "" })
        const [formData, setFormData] = useState({
            name: '',
            character: '',
            color:'',
            level:''
        })

    const handleChange = (e) => {
        const {name, value} = e.target;

        setPost( (prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })

        const imageMap = {
            mario: ['red', 'yellow', 'brown', 'white'],
            luigi: ['green'],
            principessa: ['pink', 'white']
          };

        if (name === 'character'){
            const selectedCharacter = value;
            const colorSelect = document.getElementById('color');
            colorSelect.innerHTML = '<option value="">-- Select Color --</option>';

            if (imageMap[selectedCharacter]){
                imageMap[selectedCharacter].forEach(color => {
                    const option = document.createElement('option');
                    option.value = color;
                    option.textContent = color.charAt(0).toUpperCase() + color.slice(1);
                    colorSelect.appendChild(option);
                });
                setFormData(prev => ({ ...prev, color: imageMap[selectedCharacter][0] || '' }));
            } else{
                setFormData(prev => ({ ...prev, color: '' }));
            }

        }
    }

    const updatePost = async (e) => {

        e.preventDefault();

        await supabase
        .from("Posts")
        .update({name: post.name, character: post.character, color: post.color, level: post.level})
        .eq('id', id);

        window.location = "/";
    }

    const deletePost = async (event) => {

        event.preventDefault();

        await supabase
        .from('Posts')
        .delete()
        .eq('id', id);

        window.location = "/";
    }

    return(
        <div>
            <h1>Update Crewmate</h1>
            <form>
                <label htmlFor="name">Crewmate Name</label><br />
                <input type="text" id="name" name='name' onChange={handleChange}/><br />
                <br />

                <label htmlFor="character">Select Your Character</label><br />
                <select name="character" id="character" onChange={handleChange}>
                    <option value="">Select the Character</option>
                    <option value="mario">Mario</option>
                    <option value="luigi">Luigi</option>
                    <option value="principessa">Principessa</option>
                </select>
                <br />

                <label htmlFor="color">Choose Color</label><br />
                <select name="color" id="color" onChange={handleChange}>
                    <option value="">Select the Character First</option>
                </select>
                <br />

                <label htmlFor="name">Crewmate Level</label><br />
                <input type="text" id="level" name='level' onChange={handleChange}/><br />
                <br />

                <div className='buttongroup'>
                    <input type="submit" value="Update this Crewmate" onClick={updatePost} />
                    <button onClick={deletePost}>🗑️ Delete this Crewmate</button>
                </div>
            </form>
        </div>
    )
}

export default EditPost