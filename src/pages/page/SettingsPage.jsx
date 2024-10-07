import { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import { Label } from "../../components/ui/label"
import { Button, } from "../../components/ui/button"
import { Switch } from "../../components/ui/switch"
import { Input } from "postcss";

const SettingsPage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const handleSaveSettings = () => {
    // Logic to save settings (e.g., API call)
    console.log("Settings saved:", {
      notificationsEnabled,
      darkMode,
      apiKey,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications">Enable Notifications</Label>
          <Switch
            id="notifications"
            checked={notificationsEnabled}
            onChange={setNotificationsEnabled}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="darkMode">Dark Mode</Label>
          <Switch
            id="darkMode"
            checked={darkMode}
            onChange={setDarkMode}
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="apiKey">API Key</Label>
          <Input
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="mt-1"
          />
        </div>
      </div>

      <Button onClick={handleSaveSettings} className="flex items-center">
        <AiOutlineSave className="mr-2" />
        Save Settings
      </Button>
    </div>
  );
};

export default SettingsPage;
