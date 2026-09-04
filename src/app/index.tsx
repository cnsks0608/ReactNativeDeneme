import { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';


function Greeting({
  name,
  isWelcomed,
  onPress }: {
    name: string;
    isWelcomed: boolean;
    onPress: () => void
  }) {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.greeting}>
        {isWelcomed ? 'Hoşgeldiniz' : `Merhaba, ${name}!`}
      </Text>
    </Pressable>
  )
    ;
}



export default function HomeScreen() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(0); // ekranın yeniden çizilmesine gerek olmayan ancak hafızada tutulması gereken değişkenler (başlangıçta hiçbir zamanlayıcı çalışmadığı için -> null)
  const [isWelcomed, setIsWelcomed] = useState(false);

  function baslat(yon:number) {
    intervalRef.current = // setinterval çalışmaya başlamadan önce verilen bir çeşit kimlik kartı
      setInterval(() => { // javascriptin hazır fonksiyonu 
        setCount((count) => count + yon ) 
      }, 100);  // 100 ms de 1 setcount işini yapar
  }

  function durdur() {
    clearInterval(intervalRef.current); // o kimlikli işlemi durdurur 
  }

  return (
    <View style={styles.container}>
      <Greeting name="Cansu" isWelcomed={isWelcomed} onPress={() => isWelcomed ? setIsWelcomed(false) : setIsWelcomed(true)} />
      <Text style={styles.text}>Sayı: {count}</Text>
      <Pressable onPressIn={()=> baslat(1)} onPressOut={durdur} >
        <Text style={{ color: 'green', fontSize: 20 }}>Arttır</Text>
      </Pressable>
      <Pressable onPressIn={()=> baslat(-1)} onPressOut={durdur} >
        <Text style={{ color: 'green', fontSize: 20 }}>Azalt</Text>
      </Pressable>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  text: {
    fontSize: 24,
  },
  greeting: {
    color: "purple",
    fontSize: 40,
    marginBottom: 20,
  }
});