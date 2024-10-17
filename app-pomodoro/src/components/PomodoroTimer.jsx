
import { useEffect, useState } from "react"
import { Box, Button, Text, Input, FormControl, FormLabel, Center, HStack  } from "@chakra-ui/react"
import pomodoro from "../assets/pomodoro.png"
function PomodoroTimer() {
    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [userTime, setUserTime] = useState(25)
    const handleTimeChange = (e) => {
        setUserTime(e.target.value)
        setMinutes(e.target.value)
    }

    useEffect(() => {
        let interval

        if(isActive && (minutes>0 ||seconds > 0)) {
            interval = setInterval(() => {
                if(seconds ===0){
                    setMinutes(minutes-1)
                    setSeconds(59)
                }else{
                    setSeconds(seconds-1)
                }
            },1000)
        }else if (minutes === 0 && seconds === 0){
        alert("Tempo esgotado")
        resetTimer();
        }else{
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isActive, minutes, seconds])

    const resetTimer = () =>{
        setIsActive(false)
        setMinutes(userTime)
        setSeconds(0)
    }
   const toggleTimer = () =>{
    setIsActive(!isActive)
   }
  return (
    
    <Center >
        <img src={pomodoro} alt="" />
      <Box width={'100%'} maxWidth={"400px"} p={"4"}>
      <Text fontSize={"4xl"} mb={"4"} textAlign={"center"}>{String(minutes).padStart(2, '0')}: {String(seconds).padStart(2, '0')}</Text>
        <FormControl mb={"4"}>
            <FormLabel>Definir tempo (minutos) </FormLabel>
            <Input type="number" value={userTime} onChange={handleTimeChange} isDisabled={isActive}/>
        </FormControl>
        <HStack spacing={"4"}>
            <Button  onClick={toggleTimer} colorScheme={isActive ? "red" : "green"}>{isActive? "Pausar" : "Iniciar"}</Button>
            <Button colorScheme={"gray"} onClick={resetTimer}>Reiniciar</Button>
        </HStack>
      </Box>
    </Center>
  )
}

export default PomodoroTimer
