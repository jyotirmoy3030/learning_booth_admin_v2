import { React, useState, useEffect } from 'react'
import {
    Button,
    FormHelperText,
    Grid,
    OutlinedInput,
    Stack,
    InputLabel,
    Typography,
} from '@mui/material';
import HeaderTwo from '../../../components/HeaderTwo';
import BackgroundDesign from '../../../components/background_design/BackgroundDesign';
import { useParams } from 'react-router-dom';
import character from "../../../assets/images/character2.png";
import proctoring1 from "../../../assets/images/proctoring/proctoring1.jpeg";
import proctoring2 from "../../../assets/images/proctoring/proctoring2.jpeg";
import proctoring3 from "../../../assets/images/proctoring/proctoring3.jpeg";
import proctoring4 from "../../../assets/images/proctoring/proctoring4.png";
import proctoring5 from "../../../assets/images/proctoring/proctoring5.png";
import proctoring6 from "../../../assets/images/proctoring/proctoring6.png";
import { getAllScreenshots } from "services/Master/Results";


function ProctoringView() {
    const [selectedImage, setSelectedImage] = useState(null);
    const { id } = useParams();
    const [galleryImages, setgalleryImages] = useState([]);
    useEffect(() => {
        const fetchScreenshots = async () => {
            try {
                const response = await getAllScreenshots(id); // Pass the resultId (id)
                if (response?.data?.screenshots) {
                    setgalleryImages(response.data.screenshots);
                } else {
                    setgalleryImages([]);
                }
            } catch (error) {
                console.error('Error fetching screenshots:', error);
                setgalleryImages([]);
            }
        };

        fetchScreenshots();
    }, [id]);

    useEffect(() => {
        if (selectedImage) {
            // Disable scrolling when modal is open
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        } else {
            // Re-enable scrolling when modal is closed
            document.documentElement.style.overflow = 'auto';
            document.body.style.overflow = 'auto';
        }

        // Clean up when component unmounts or modal is closed
        return () => {
            document.documentElement.style.overflow = 'auto';
            document.body.style.overflow = 'auto';
        };
    }, [selectedImage]);
    return (
        <>
            <BackgroundDesign character_image={character} />
            <HeaderTwo />
            <div>
                <Typography variant="h1" sx={{ my: 2 }}>
                    Proctoring Images
                </Typography>
                {/* Gallery Section */}
                <section className="relative bg-white h-[430px] overflow-y-auto p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {galleryImages.map((img, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                                onClick={() => setSelectedImage(img)}
                            >
                                <img
                                    src={img}
                                    alt={`Gallery ${index}`}
                                    className="w-full h-40 object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Full-Screen Modal */}
                    {selectedImage && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999] cursor-pointer"
                            onClick={() => setSelectedImage(null)}
                            style={{
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                            }}
                        >
                            <img
                                src={selectedImage}
                                alt="Enlarged"
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    )}
                </section>
            </div>
        </>
    )
}

export default ProctoringView