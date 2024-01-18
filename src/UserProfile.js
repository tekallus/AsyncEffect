import { useEffect, useState } from "react";
import { API } from "./constants";

//useEffect fonksiyonunu doğrudan async olarak işaretleyemeyiz.
//useEffect içinde disarda tanimlanmis bir async fonksiyon çağırabilir.
//useEffect içindeki işlemler async/await kullanarak gerçekleştirilebilir.

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  const url = `${API}/users/${userId}`;

  // async fetchData yardimci function olusturalim
  async function fetchData(url) {
    try {
      // 1. API'ye HTTP isteği gönderip response nesnesini dondurelim. await ile istegin tamamlanmasini bekleyelim
      const res = await fetch(url);
      // 2. Yanıttan JSON verisini çıkarma
      const json = await res.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error("API hatası:", error);
      return null;
    }
  }
  // useEffect icinde fetchData yi cagirmakicin
  //useEffect bir callback fonksiyon alır ve bu fonksiyon async olarak işaretlenebilir.
  //Ancak, doğrudan async işlemleri useEffect içinde gerçekleştiremeyiz.
  //useEffect icinde asenkron fonksiyonu bir değişkene atayarak veya doğrudan fonksiyon ifadesi olarak kullanarak async olarak işaretlenebilir.

  useEffect(() => {
    const fetchDataAndSetUser = async () => {
      try {
        const userData = await fetchData(url);
        setUser(() => userData); // State'i güncelleme
      } catch (error) {
        console.error("Veri alma hatası:", error);
      }
    };

    fetchDataAndSetUser();
  }, [userId]);

  if (!user) {
    return "Yükleniyor...";
  }
  //user state'i null oldugu icin ekranda "Yükleniyor..." ifadesi görüntülenecektir.
  return (
    <section>
      <dl>
        <dt>İsim</dt>
        <dd>{user.name}</dd>
        <dt>Email</dt>
        <dd>{user.email}</dd>
      </dl>
    </section>
  );
}

export default UserProfile;
