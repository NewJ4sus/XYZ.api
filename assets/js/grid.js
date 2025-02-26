function updateAutoColumns() {
    document.querySelectorAll('.grid').forEach(grid => {
      const items = Array.from(grid.children);
      const totalColumns = 12;
      
      // Подсчитываем занятые колонки фиксированными элементами
      let usedColumns = 0;
      const autoColumns = [];
      
      items.forEach(item => {
        if (item.classList.contains('col')) {
          autoColumns.push(item);
        } else {
          // Ищем col-* классы
          const colClass = Array.from(item.classList).find(cls => /^col-\d+$/.test(cls));
          if (colClass) {
            usedColumns += parseInt(colClass.split('-')[1]);
          }
        }
      });
  
      // Распределяем оставшиеся колонки
      if (autoColumns.length > 0) {
        const remainingColumns = totalColumns - usedColumns;
        // Используем округление до ближайшего целого
        const columnsPerAuto = Math.floor(remainingColumns / autoColumns.length);
        
        autoColumns.forEach(item => {
          // Устанавливаем целое значение колонок
          item.style.setProperty('--col-auto-span', columnsPerAuto);
        });
      }
    });
  }
  
  // Запускаем при загрузке страницы
  document.addEventListener('DOMContentLoaded', updateAutoColumns);
  
  // Обновляем при изменении размера окна
  window.addEventListener('resize', updateAutoColumns);