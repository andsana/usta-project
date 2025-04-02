import { useParams } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs.tsx';
import { translations } from '../../app/constants/translations.ts';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import { GlacierData } from './glacier.ts';
import GlacierGraph from './GlacierGraph.tsx';

export interface Glacier {
  glacier_id: number;
  // humidity: number; // Влажность
  // wind_velocity: number; // Скорость ветра
  // temperature: number; // Температура
  // water_volume: number; // Объем воды
  mass: number; // Масса ледника
  real_mass: number;
}

const GlacierDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();

  const glacierData = GlacierData.filter(
    (data) => data.glacier_id === Number(id),
  );

  // Если ледник не найден, отображаем сообщение
  if (glacierData.length === 0) {
    return (
      <div>
        <h2>Glacier not found</h2>
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          {
            text: translations[language].glacierDetailsBreadcrumbs,
            to: '/artificial-glacier-monitoring-system',
          },
        ]}
        currentText={`Mass Change Chart for Glacier ID: ${id}`}
      />

      <div className="page container">
        <GlacierGraph
          glacierData={glacierData} // Передаем данные ледника
          glacierId={glacierData[0]?.glacier_id} // Передаем ID ледника
        />
      </div>
    </>
  );
};

export default GlacierDetailsPage;
