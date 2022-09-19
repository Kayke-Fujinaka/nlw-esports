import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import {
  CaretDown,
  CaretUp,
  Check,
  Checks,
  GameController,
} from "phosphor-react";
import { Input } from "./Form/Input";
import { Label } from "./Form/Label";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDay, setWeekDay] = useState<string[]>([]);

  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  async function handleCreateAd(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) {
      return;
    }

    console.log(data)

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDay.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });
      alert("Anúncio criado com sucesso");
    } catch (err) {
      alert("Erro ao criar anúncio");
      console.log(err);
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique seu anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="game">Qual o game?</Label>
            <select
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
              id="game"
              name="game"
              defaultValue=""
            >
              <option disabled value="">
                Selecione o game que deseja jogar
              </option>

              {games.map((game) => {
                return (
                  <option key={game.id} value={game.id}>
                    {game.title}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Seu nome (ou nickname)</Label>
            <Input
              id="name"
              name="name"
              placeholder="Como te chamam dentro do game?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="yearsPlaying">Joga há quantos anos?</Label>
              <Input
                name="yearsPlaying"
                id="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="discord">Qual seu discord?</Label>
              <Input
                name="discord"
                id="discord"
                type="text"
                placeholder="Usuario#0000"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="weekDays">Quando costuma jogar?</Label>
              <ToggleGroup.Root
                type="multiple"
                id="weekDays"
                className="grid grid-cols-4 gap-2"
                value={weekDay}
                onValueChange={setWeekDay}
              >
                <ToggleGroup.Item
                  value="0"
                  className={`w-8 h-8 text-center rounded ${
                    weekDay.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                  } transition hover:bg-violet-600`}
                  title="Domingo"
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Segunda"
                  className={`w-8 h-8 text-center rounded ${
                    weekDay.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                  } transition hover:bg-violet-600`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title="Terça"
                  className={`w-8 h-8 text-center rounded ${
                    weekDay.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                  } transition hover:bg-violet-600`}
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title="Quarts"
                  className={`w-8 h-8 text-center rounded ${
                    weekDay.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                  } transition hover:bg-violet-600`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title="Quinta"
                  className={`w-8 h-8 text-center rounded ${
                    weekDay.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                  } transition hover:bg-violet-600`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  title="Sexta"
                  className={`w-8 h-8 text-center rounded ${
                    weekDay.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                  } transition hover:bg-violet-600`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  title="Sábado"
                  className={`w-8 h-8 text-center rounded ${
                    weekDay.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                  } transition hover:bg-violet-600`}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="hourStart">Qual horário do dia?</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  id="hourStart"
                  name="hourStart"
                  type="time"
                  placeholder="De"
                />
                <Input
                  id="hourEnd"
                  name="hourEnd"
                  type="time"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex gap-2 text-sm items-center">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked: boolean) =>
                checked === true
                  ? setUseVoiceChannel(true)
                  : setUseVoiceChannel(false)
              }
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
              type="submit"
            >
              <GameController className="w-6 h-6" />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

// Tirar a estilização da Div acima

/* <Select.Root>
              <Select.Trigger
                asChild
                className="inset-0 bg-zinc-900 py-3 px-4 rounded text-sm inline-flex items-center justify-between text-zinc-500"
              >
                <button>
                  <Select.Value placeholder="Selecione o game que deseja jogar" />
                  <Select.Icon>
                    <CaretDown color="#FFFFFF" />
                  </Select.Icon>
                </button>
              </Select.Trigger>
              <Select.Content className="overflow-hidden bg-white shadow-sm">
                <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-zinc-500 text-white cursor-default">
                  <CaretUp />
                </Select.ScrollUpButton>

                <Select.Viewport className="bg-zinc-900 p-3 shadow-lg w-[400px]">
                  <Select.Group className="flex flex-col gap-2">
                    {games.map((game) => {
                      return (
                        <Select.Item
                          key={game.id}
                          value={game.title}
                          className="hover:bg-orange-600 disabled:text-opacity-80 disabled:pointer-events-none"
                        >
                          <Select.ItemText>{game.title}</Select.ItemText>
                          <Select.ItemIndicator>
                            <Checks />
                          </Select.ItemIndicator>
                        </Select.Item>
                      );
                    })}
                  </Select.Group>
                </Select.Viewport>

                <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-zinc-500 text-white cursor-default">
                  <CaretDown />
                </Select.ScrollDownButton>
              </Select.Content>
</Select.Root> */
