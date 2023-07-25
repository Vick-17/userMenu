import React, { useEffect, useState } from 'react';
import { getDaily } from '../Services/apiService';

const Main = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchDailyContent = async () => {
      try {
        const data = await getDaily();
        setContent(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDailyContent();
  }, []);

  return (
    <div className="jqr-container">
      <div className="jqr-content">
        {content ? (
          <div>
            <p>
              <strong>Blague du jour :</strong>
              <br />
              {content.joke}
            </p>
            <p>
              <strong>Citation du jour :</strong>
              <br />
              {content.quote}
            </p>
            <p>
              <strong>Énigme du jour :</strong>
              <br />
            </p>
          </div>
        ) : (
          <p>Contenu du jour non disponible.</p>
        )}
      </div>
    </div>
  );
};

export default Main;
