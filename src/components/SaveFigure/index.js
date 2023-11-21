import { useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import Button from '@mui/material/Button';

export default function SaveFigure({ name }) {
  const { gl, scene, camera } = useThree()
  return <Html>
    <Button variant="contained" onClick={
      () => {
        gl.render(scene, camera)
        const screenshot = gl.domElement.toDataURL()

        const link = document.createElement("a")
        link.download = name
        link.href = screenshot
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }>Save</Button>
  </Html>
}