<?php

namespace App\Filament\Resources\Events\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class EventsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Title')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),

                Hidden::make('slug'),

                Select::make('event_id')
                    ->label('Event (Watch)')
                    ->nullable()
                    ->options(function () {
                        try {
                            $baseUrl = rtrim(config('app.api_base_url'), '/');
                            $apiKey = config('app.api_key');
                            $url = "{$baseUrl}/api/v1/admin/channel/get/api/key/events";

                            Log::info('[Watch] Fetching events', [
                                'url' => $url,
                                'api_key_set' => !empty($apiKey),
                                'api_key_prefix' => $apiKey ? substr($apiKey, 0, 8) . '...' : null,
                            ]);

                            $response = Http::withHeaders([
                                'Accept' => 'application/json',
                                'Content-Type' => 'application/json',
                            ])->get($url, ['api_key' => $apiKey]);

                            Log::info('[Watch] Events response', [
                                'status' => $response->status(),
                                'successful' => $response->successful(),
                                'body_preview' => substr($response->body(), 0, 300),
                            ]);

                            if ($response->successful()) {
                                $data = $response->json();

                                Log::info('[Watch] Events JSON keys', [
                                    'keys' => array_keys($data ?? []),
                                    'return_type' => isset($data['return']) ? gettype($data['return']) : 'missing',
                                ]);

                                // Response shape: {"return": {"upcoming_events": [...], "past_events": [...]}}
                                $upcoming = $data['return']['upcoming_events'] ?? [];
                                $past     = $data['return']['past_events'] ?? [];
                                $all      = array_merge($upcoming, $past);

                                Log::info('[Watch] Events found', [
                                    'upcoming' => count($upcoming),
                                    'past' => count($past),
                                ]);

                                if (!empty($all)) {
                                    $options = collect($all)
                                        ->filter(fn ($e) => !empty($e['title']) && !empty($e['id']))
                                        ->mapWithKeys(fn ($e) => [(string) $e['id'] => $e['title']])
                                        ->toArray();

                                    Log::info('[Watch] Events options built', ['count' => count($options)]);

                                    return $options;
                                }

                                Log::warning('[Watch] Empty events list in response', ['data' => $data]);
                            } else {
                                Log::warning('[Watch] Non-successful HTTP response', [
                                    'status' => $response->status(),
                                    'body' => $response->body(),
                                ]);
                            }
                        } catch (\Exception $e) {
                            Log::error('[Watch] Exception fetching events', [
                                'message' => $e->getMessage(),
                                'file' => $e->getFile(),
                                'line' => $e->getLine(),
                            ]);
                        }

                        return [];
                    })
                    ->getOptionLabelUsing(function ($value) {
                        if (!$value) return null;

                        try {
                            $baseUrl = rtrim(config('app.api_base_url'), '/');
                            $apiKey = config('app.api_key');
                            $url = "{$baseUrl}/api/v1/admin/channel/get/api/key/events";

                            $response = Http::withHeaders([
                                'Accept' => 'application/json',
                                'Content-Type' => 'application/json',
                            ])->get($url, ['api_key' => $apiKey]);

                            if ($response->successful()) {
                                $data = $response->json();

                                $upcoming = $data['return']['upcoming_events'] ?? [];
                                $past     = $data['return']['past_events'] ?? [];
                                $all      = array_merge($upcoming, $past);

                                $event = collect($all)->firstWhere('id', (int) $value)
                                    ?? collect($all)->firstWhere('id', (string) $value);

                                return $event['title'] ?? null;
                            }

                            Log::warning('[Watch] Could not resolve label for event_id', [
                                'value' => $value,
                                'status' => $response->status(),
                            ]);
                        } catch (\Exception $e) {
                            Log::error('[Watch] Exception resolving event label', [
                                'message' => $e->getMessage(),
                            ]);
                        }

                        return null;
                    })
                    ->searchable()
                    ->default(null)
                    ->live()
                    ->afterStateUpdated(function ($state, $set) {
                        $set('ussd', $state ? "*797*50*2*{$state}#" : null);
                    }),

                DatePicker::make('date')
                    ->label('Date')
                    ->required(),

                TimePicker::make('start_time')
                    ->label('Start Time')
                    ->required(),

                TimePicker::make('end_time')
                    ->label('End Time')
                    ->required(),

                TextInput::make('location')
                    ->label('Location')
                    ->required()
                    ->maxLength(255),

                Select::make('visibility')
                    ->label('Visibility')
                    ->options([
                        'Public' => 'Public',
                        'Unlisted' => 'Unlisted',
                    ])
                    ->default('Public')
                    ->required(),

                Textarea::make('description')
                    ->label('Description')
                    ->rows(4)
                    ->columnSpanFull(),

                TextInput::make('booking_link')
                    ->label('Booking Link')
                    ->url()
                    ->maxLength(255),

                TextInput::make('ussd')
                    ->label('USSD Code')
                    ->maxLength(255),

                FileUpload::make('image')
                    ->label('Image')
                    ->image()
                    ->imageEditor()
                    ->disk('public')
                    ->directory('events')
                    ->visibility('public')
                    ->maxSize(2048)
                    ->columnSpanFull(),
            ]);
    }
}
