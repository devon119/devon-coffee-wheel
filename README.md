# ☕ 咖啡品鑑工作台

單檔 HTML 的咖啡品鑑工具，整合 SCA 風味輪 + 產區品種對位 + 烘焙校對 + 沖煮建議 + 杯測日誌。

## 功能

- 🎯 **風味矩陣推算**：依產區 × 品種 × 處理法 × 焙度 × 沖煮 動態推演應出現的風味
- 🎨 **83 片 SCA 官方色風味輪**：色碼從 SCA 官方 PDF 精準抽取
- 🔥 **烘焙校對**：context-aware 烘焙曲線建議（入豆溫、BT、Development%、Drying 秒數）
- 💧 **沖煮建議**：7 焙度 × 4 維度動態沖煮卡（含逐秒時程、水質建議、養豆天數）
- 📐 **推理軌跡**：每個參數調整都附原因說明
- 💾 **杯測日誌**：本地儲存，含評分、筆記、實際沖煮參數
- 🧠 **AI 延伸**：支援 Gemini / OpenAI / Claude（選配，需自備 API Key）
- 🔆 **風味輪篩選**：可突顯預期風味、暗化其他
- 📱 **完全離線**：ECharts 內嵌、無 CDN 依賴

## 使用方式

直接訪問 https://devon119.github.io/devon-coffee-wheel/ 即可，無需安裝。

## 開發

```bash
git clone https://github.com/devon119/devon-coffee-wheel.git
cd devon-coffee-wheel
# 開啟 index.html 即可
```

## License

個人學習專案。風味輪色板參考 [SCA Coffee Taster's Flavor Wheel](https://sca.coffee/research/coffee-tasters-flavor-wheel)（Apache 2.0）。ECharts 內嵌為 Apache 2.0。
